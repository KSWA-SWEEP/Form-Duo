package com.example.jpa_demo.service.posts;

import com.example.jpa_demo.domain.posts.Posts;
import com.example.jpa_demo.domain.posts.PostsRepository;
import com.example.jpa_demo.web.dto.posts.PostsResponseDto;
import com.example.jpa_demo.web.dto.posts.PostsSaveRequestDto;
import com.example.jpa_demo.web.dto.posts.PostsUpdateRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Service
public class PostService {
    private final PostsRepository postsRepository;

    @Transactional
    public Long save(PostsSaveRequestDto requestDto) {
        return postsRepository.save(requestDto.toEntity()).getId();
    }

    @Transactional
    public Long update(Long id, PostsUpdateRequestDto requestDto){
        Posts posts = postsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시물이 없습니다. id =" + id));

        posts.update(requestDto.getTitle(), requestDto.getContent());
        return id;
    }

    public PostsResponseDto findById(Long id){
        Posts entity = postsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id ="+ id));

        return new PostsResponseDto(entity);}
}
